import {
    Column,
    Entity,
    ManyToMany
} from 'typeorm'
import { BaseModel } from './BaseModel'
import { Place } from './Place';
@Entity("amenities")
export class Amenity extends BaseModel {
    @Column()
    name: string;

    @ManyToMany(() => Place, (place) => place.amenities, { onDelete: "CASCADE"})
    places: Place[]
}