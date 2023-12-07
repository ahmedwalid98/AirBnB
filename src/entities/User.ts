import { Entity, Column,  OneToMany, Unique, BeforeInsert, BeforeUpdate } from "typeorm"
import { BaseModel } from "./BaseModel"
import { Review } from "./Review";
import { Place } from "./Place";
import bcrypt from 'bcrypt'
@Entity("users")
@Unique(['email'])
export class User extends BaseModel {
    @Column({length: 265, nullable:false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string

    @OneToMany(type => Review, (review) => review.user)
    reviews: Review[]

    @OneToMany(type => Place, (place) => place.user)
    places: Place[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
}
