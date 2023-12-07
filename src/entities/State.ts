import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { City } from "./City";

@Entity("states")
export class State extends BaseModel{
    @Column({nullable: false})
    name: string;


    @OneToMany(() => City, (city) => city.state, {
        onDelete: 'CASCADE',
    })
    citites: City[]
}