import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEnum, IsOptional, IsDateString } from 'class-validator';

export enum PriorityEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum StatusEnum {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Implementar autenticação JWT',
    minLength: 4,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'O título da tarefa não pode ser vazio!' })
  @IsString({ message: 'O título da tarefa deve ser uma string!' })
  @MinLength(4, { message: 'O título da tarefa precisa ter no mínimo 4 caracteres!' })
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example: 'Implementar sistema de autenticação usando JWT com refresh tokens',
    minLength: 10,
    maxLength: 1000,
  })
  @IsNotEmpty({ message: 'A descrição da tarefa não pode ser vazia!' })
  @IsString({ message: 'A descrição da tarefa deve ser uma string!' })
  @MinLength(10, { message: 'A descrição da tarefa precisa ter no mínimo 10 caracteres!' })
  description: string;

  @ApiProperty({
    description: 'Prioridade da tarefa',
    enum: PriorityEnum,
    example: PriorityEnum.HIGH,
  })
  @IsEnum(PriorityEnum, { message: 'Prioridade inválida!' })
  priority: PriorityEnum;

  @ApiProperty({
    description: 'Status atual da tarefa',
    enum: StatusEnum,
    example: StatusEnum.TODO,
    default: StatusEnum.TODO,
  })
  @IsEnum(StatusEnum, { message: 'Status inválido!' })
  status: StatusEnum;

  @ApiProperty({
    description: 'Data de vencimento da tarefa',
    example: '2024-12-31T23:59:59.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de vencimento deve ser uma data válida!' })
  dueDate?: string;
}

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Implementar autenticação JWT - Atualizado',
    minLength: 4,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O título da tarefa deve ser uma string!' })
  @MinLength(4, { message: 'O título da tarefa precisa ter no mínimo 4 caracteres!' })
  title?: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example: 'Implementar sistema de autenticação usando JWT com refresh tokens e rate limiting',
    minLength: 10,
    maxLength: 1000,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A descrição da tarefa deve ser uma string!' })
  @MinLength(10, { message: 'A descrição da tarefa precisa ter no mínimo 10 caracteres!' })
  description?: string;

  @ApiProperty({
    description: 'Prioridade da tarefa',
    enum: PriorityEnum,
    example: PriorityEnum.URGENT,
    required: false,
  })
  @IsOptional()
  @IsEnum(PriorityEnum, { message: 'Prioridade inválida!' })
  priority?: PriorityEnum;

  @ApiProperty({
    description: 'Status atual da tarefa',
    enum: StatusEnum,
    example: StatusEnum.IN_PROGRESS,
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusEnum, { message: 'Status inválido!' })
  status?: StatusEnum;

  @ApiProperty({
    description: 'Data de vencimento da tarefa',
    example: '2024-12-31T23:59:59.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de vencimento deve ser uma data válida!' })
  dueDate?: string;
}

export class CreateCommentDto {
  @ApiProperty({
    description: 'Conteúdo do comentário',
    example: 'Tarefa iniciada com sucesso! Vou implementar a autenticação JWT.',
    minLength: 1,
    maxLength: 500,
  })
  @IsNotEmpty({ message: 'O conteúdo do comentário não pode ser vazio!' })
  @IsString({ message: 'O conteúdo do comentário deve ser uma string!' })
  @MinLength(1, { message: 'O comentário precisa ter pelo menos 1 caractere!' })
  content: string;
}

export class TaskResponseDto {
  @ApiProperty({
    description: 'ID único da tarefa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Implementar autenticação JWT',
  })
  title: string;

  @ApiProperty({
    description: 'Descrição da tarefa',
    example: 'Implementar sistema de autenticação usando JWT com refresh tokens',
  })
  description: string;

  @ApiProperty({
    description: 'Prioridade da tarefa',
    enum: PriorityEnum,
    example: PriorityEnum.HIGH,
  })
  priority: PriorityEnum;

  @ApiProperty({
    description: 'Status da tarefa',
    enum: StatusEnum,
    example: StatusEnum.TODO,
  })
  status: StatusEnum;

  @ApiProperty({
    description: 'Data de vencimento',
    example: '2024-12-31T23:59:59.000Z',
    format: 'date-time',
  })
  dueDate: string;

  @ApiProperty({
    description: 'ID do usuário proprietário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  ownerId: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-01-01T12:00:00.000Z',
    format: 'date-time',
  })
  updatedAt: string;
}

export class CommentResponseDto {
  @ApiProperty({
    description: 'ID único do comentário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Conteúdo do comentário',
    example: 'Tarefa iniciada com sucesso!',
  })
  content: string;

  @ApiProperty({
    description: 'ID do usuário que fez o comentário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @ApiProperty({
    description: 'ID da tarefa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  taskId: string;

  @ApiProperty({
    description: 'Data de criação do comentário',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  createdAt: string;
}

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Número da página',
    example: 1,
    minimum: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  page?: string;

  @ApiProperty({
    description: 'Tamanho da página (número de itens por página)',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    required: false,
  })
  @IsOptional()
  size?: string;
}

export class TaskFiltersDto {
  @ApiProperty({
    description: 'Filtrar por título da tarefa',
    example: 'autenticação',
    required: false,
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Filtrar por status da tarefa',
    enum: StatusEnum,
    example: StatusEnum.TODO,
    required: false,
  })
  @IsOptional()
  status?: StatusEnum;

  @ApiProperty({
    description: 'Filtrar por prioridade da tarefa',
    enum: PriorityEnum,
    example: PriorityEnum.HIGH,
    required: false,
  })
  @IsOptional()
  priority?: PriorityEnum;
}


