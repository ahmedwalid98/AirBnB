import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable
} from 'typeorm'
import { BaseModel } from './BaseModel'
import { City } from './City'
import { User } from './User'
import { Review } from './Review'
import { Amenity } from './Amenity'

@Entity("places")
export class Place extends BaseModel {
    @Column({nullable: false})
    name: string;

    @Column()
    decsription: string;

    @Column({default: 0})
    number_rooms: number;

    @Column({default: 0})
    number_bathrooms: number;

    @Column({default: 0})
    max_guest: number;

    @Column({default: 0})
    price_by_night: number;

    @Column('float')
    latitude: number;

    @Column('float')
    longitude: number;

    @ManyToOne(() => City, (city) => city.places, { onDelete: "CASCADE"})
    city: City;

    @ManyToOne(() => User, (user) => user.places, { onDelete: "CASCADE"})
    user: User;

    @OneToMany(() => Review, (review) => review.place)
    reviews: Review[];

    @ManyToMany(() => Amenity, (amenity) => amenity.places, { onDelete: "CASCADE"})
    @JoinTable({name: "place_amenity"})
    amenities: Amenity[]
}
