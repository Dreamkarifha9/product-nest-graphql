import { Category } from "./../entities/category.entity";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoryInput } from "../dto/create-category.input";
import { UpdateCategoryInput } from "../dto/update-category.input";
import { EntityNotFoundException } from "src/exceptions/entity-not-found/entity-not-found.exception";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  async create(createCategoryInput: CreateCategoryInput) {
    const { name } = createCategoryInput;
    // check dupicate category
    const hasWithCategorynameAndCategoryId_ = await this.findOneByName(name);
    if (hasWithCategorynameAndCategoryId_) {
      this.logger.error(`เกิดข้อผิดพลาด ชื่อหมวดสินค้า ${name} มีอยู่ในระบบแล้ว`);
      throw new ConflictException("An category with that categoryname  has already been category");
    }
    this.logger.info(`ขั้นตอนการสร้างข้อมูล Category`);
    const newCategory_ = this.categoryRepository.create(createCategoryInput);

    return await this.categoryRepository.save(newCategory_);
  }

  async getAll() {
    this.logger.info(`ขั้นการดึงข้อมูล Category ทั้งหมด`);
    return await this.categoryRepository.find();
  }

  async findOneByName(productname: string): Promise<Category> {
    const result_ = await this.categoryRepository.createQueryBuilder().where("name=:name", { name: productname }).getOne();
    return result_;
  }

  async getOne(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      this.logger.error(`เกิดข้อผิดพลาด ไม่พบข้อมูลหมวดสินค้าที่ค้นหา`);
      throw new EntityNotFoundException(categoryId, Category);
    }
    this.logger.info(`ขั้นตอนการดึงข้อมูล Category ตามรหัส categoryId`);
    return category;
  }

  async findOne_Relations(id: number): Promise<Category> {
    this.logger.info(`ขั้นการดึงข้อมูล Category Relations`);
    return await this.categoryRepository.findOne(id, {
      relations: ["products"],
    });
  }

  async changeOne(updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    const FindCategoryId_: number = updateCategoryInput.id;
    const category = await this.categoryRepository.findOne(FindCategoryId_);

    // เช็คก่อนว่ามีค่าใน database จริงไหม ก่อนที่จะ บันทึก
    if (!category) {
      this.logger.error(`เกิดข้อผิดพลาด ไม่พบข้อมูลสินค้าที่ต้องการที่จะอัพเดท ${FindCategoryId_}`);
      throw new EntityNotFoundException(FindCategoryId_, Category);
    }
    this.logger.info(`ขั้นตอนการอัพเดทข้อมูล Category ตามรหัส CategoryId`);
    return await this.categoryRepository.save({
      ...category,
      ...updateCategoryInput,
    });
  }

  async removeOne(CategoryId: number): Promise<Category> {
    // ค้นหาก่อนที่จะลบ ตรวจสอบว่ามีข้อมูลจริงไหม
    const FindCategoryId_ = await this.categoryRepository.findOne(CategoryId);
    if (!FindCategoryId_) {
      this.logger.error(`เกิดข้อผิดพลาด ไม่พบข้อมูลสินค้าที่ต้องการที่จะลบ ${CategoryId}`);
      throw new EntityNotFoundException(CategoryId, Category);
    }
    this.logger.info(`ขั้นตอนการลบข้อมูล Category ตามรหัส CategoryId`);
    await this.categoryRepository.delete(CategoryId);
    return FindCategoryId_;
  }
}
