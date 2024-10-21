import {Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class userModel extends Model<userModel>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    user_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullname: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    contact: string;

    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [5, 100],
                msg: 'Password must be between 5 and 10 characters'
            }
        }
    })
    password: string;

    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            len: {
                args: [4, 4],
                msg: '{PIN should be exactly 4 digits only}'
            }
        }
    })
    pin: number;

        
}