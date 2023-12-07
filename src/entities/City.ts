import {
    Column,
    Entity,
    ManyToOne,
    OneToMany
} from 'typeorm'
import { BaseModel } from './BaseModel'
import { State } from './State';
import { Place } from './Place';

@Entity("cities")
export class City extends BaseModel {
    @Column({nullable: false})
    name: string;

    @ManyToOne(() => State, (state) => state.citites, { onDelete: "CASCADE", onUpdate: "CASCADE"})
    state: State

    @OneToMany(() => Place, (place) => place.city)
    places: Place[]
}