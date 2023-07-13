import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";


@Entity({name: 'user'})
@Unique(['user_id'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 50, comment: '아이디'})
    user_id: string;

    @Column({type: 'varchar', length: 255, comment: '비밀번호' })
    password: string;

    @Column({type: 'varchar', length:255, comment: 'salt'})
    salt: string;

    @Column({type: 'varchar', length:30, comment: '이름'})
    name: string;

    @Column({type: 'tinyint', comment: '나이'})
    age: number;

    @CreateDateColumn({name: 'create_at', comment:'생성일'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at', comment:'수정일'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'delete_at', comment:'삭제일'})
    deletedAt?: Date | null; 
}

/*
@Entity - 해당 클래스는 DB user 테이블과 매핑시킬 때 사용

@Unique - 유니크 컬럼을 설정할 때 사용(배열 형태로 원하는 컬럼 값을 지정하면 된다)

@PrimaryGeneratedColumn - uuid 값을 지정하면 해당 컬럼은 uuid 타입으로 설정이 되며, Auto Increment 타입으로 설정

Auto_Increment : @PrimaryGeneratedColumn()

UUID: @PrimaryGeneratedColumn('uuid')


@Column - 해당 클래스 속성과 DB user 테이블 컬럼과 매핑시킬 때 사용

@CreateDateColumn - 데이터가 생성되는 시간을 기록할 때 사용

@UpdateDateColumn - 데이터가 수정되는 시간을 기록할 때 사용

@DeleteDateColumn - 데이터가 삭제되는 시간을 기록할 때 사용(실제 삭제되지 않는다. 백업 서버가 없다면 해당 옵션을 사용!!)
*/