import { type } from 'os';
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinTable} from 'typeorm'
import { Category } from './Category';
import { User } from './User';

@Entity()
export class Recipe{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;

    @Column()
    description : String;

    @Column()
    ingredients : String;

    @ManyToOne( type => Category, category => category.recipes,{
        eager: true
    } )
    @JoinTable()
    category : Category;

    @ManyToOne( type => User, user => user.recipes,{
        eager :true
    })
    @JoinTable()
    user : User;
}