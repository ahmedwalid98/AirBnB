import {Column, Entity, ManyToOne} from 'typeorm'
import { BaseModel } from './BaseModel'
import { User } from './User';
import { Place } from './Place';
@Entity("reviews")
export class Review extends BaseModel{
    @Column({nullable: false})
    text: string;

    @ManyToOne(type => User, (user) => user.reviews, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(type => Place, (place) => place.reviews, { onDelete: "CASCADE" })
    place: Place;
}