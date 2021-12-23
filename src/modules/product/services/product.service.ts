import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundException } from "src/exceptions/entity-not-found/entity-not-found.exception";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Repository } from "typeorm";
import { CreateProductInput } from "../dto/create-product.input";
import { UpdateProductInput } from "../dto/update-product.input";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const { name, categoryId } = createProductInput;
    // check dupicate product
    const hasWithProductnameAndCategoryId_ = await this.findOneByNameAndCategoryId(name, categoryId);
    if (hasWithProductnameAndCategoryId_) {
      this.logger.error(`เกิดข้อผิดพลาด ชื่อสินค้า ${name} และหมวดหมู่สินค้า ${categoryId} มีอยู่ในระบบแล้ว`);
      throw new ConflictException("An product with that productname and categoryid has already been product");
    }
    this.logger.info(`ขั้นตอนการสร้างข้อมูล Product`);
    const mewProduct = this.productsRepository.create(createProductInput);
    return await this.productsRepository.save(mewProduct);
  }

  async getAll(): Promise<Product[]> {
    this.logger.info(`ขั้นการดึงข้อมูล Product ทั้งหมด`);
    return await this.productsRepository.find();
  }
  async getOne(id: number): Promise<Product> {
    const products = await this.productsRepository.findOne(id);
    if (!products) {
      this.logger.error(`เกิดข้อผิดพลาด ไม่พบข้อมูลสินค้าที่ค้นหา`);
      throw new EntityNotFoundException(id, Product);
    }
    this.logger.info(`ขั้นตอนการดึงข้อมูล Product ตามรหัส ProductId`);
    return products;
  }

  public async findOneByNameAndCategoryId(productname: string, categoryid: number): Promise<Product> {
    const result_ = await this.productsRepository
      .createQueryBuilder()
      .where("name=:name", { name: productname })
      .andWhere("categoryId=:categoryId", { categoryId: categoryid })
      .getOne();
    return result_;
  }

  async changeOne(updateProductInput: UpdateProductInput): Promise<Product> {
    const FindProductId_: number = updateProductInput.id;
    const product = await this.productsRepository.findOne(FindProductId_);

    // เช็คก่อนว่ามีค่าใน database จริงไหม ก่อนที่จะ บันทึก
    if (!product) {
      this.logger.error(`เกิดข้อผิดพลาด ไม่พบข้อมูลสินค้าที่ต้องการที่จะอัพเดท ${FindProductId_}`);
      throw new EntityNotFoundException(FindProductId_, Product);
    }
    this.logger.info(`ขั้นตอนการอัพเดทข้อมูล Product ตามรหัส ProductId`);
    return await this.productsRepository.save({
      ...product,
      ...updateProductInput,
    });
  }

  async removeOne(ProductId: number): Promise<Product> {
    // ค้นหาก่อนที่จะลบ ตรวจสอบว่ามีข้อมูลจริงไหม
    const FindProductId_ = await this.productsRepository.findOne(ProductId);
    if (!FindProductId_) {
      this.logger.error(`เกิดข้อผิดพลาด ไม่พบข้อมูลสินค้าที่ต้องการที่จะลบ ${FindProductId_}`);
      throw new EntityNotFoundException(ProductId, Product);
    }
    this.logger.info(`ขั้นตอนการลบข้อมูล Product ตามรหัส ProductId`);
    await this.productsRepository.delete(ProductId);
    return FindProductId_;
  }
}
