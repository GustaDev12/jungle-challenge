import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, Req } from "@nestjs/common";
import { TaskService } from "./tasks.service";
import { CreateCommentDTO, CreateTaskDTO, UpdateTaskDTO } from "@repo/dto/tasks";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import type { Request } from "express";
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger';
import { 
  CreateTaskDto,
  TaskResponseDto,
} from '../../common/dto/tasks.dto';


@ApiTags('Tasks')
@Controller("tasks")
export class TasksController {
    constructor(
        private readonly tasksService: TaskService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ 
        summary: 'Criar nova tarefa',
        description: 'Cria uma nova tarefa no sistema. Apenas usuários autenticados podem criar tarefas.'
    })
    @ApiBody({ 
        type: CreateTaskDto,
        description: 'Dados da tarefa a ser criada',
        examples: {
            example1: {
                summary: 'Tarefa de alta prioridade',
                description: 'Exemplo de criação de tarefa com alta prioridade',
                value: {
                    title: 'Implementar autenticação JWT',
                    description: 'Implementar sistema de autenticação usando JWT com refresh tokens e rate limiting',
                    priority: 'HIGH',
                    status: 'TODO',
                    dueDate: '2024-12-31T23:59:59.000Z'
                }
            }
        }
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Tarefa criada com sucesso',
        type: TaskResponseDto
    })
    @ApiUnauthorizedResponse({ 
        description: 'Token JWT inválido ou ausente',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Unauthorized' },
                error: { type: 'string', example: 'Unauthorized' }
            }
        }
    })
    @ApiBadRequestResponse({ 
        description: 'Dados da tarefa inválidos',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Dados inválidos' },
                error: { type: 'string', example: 'Bad Request' }
            }
        }
    })
    @ApiInternalServerErrorResponse({ 
        description: 'Erro interno do servidor',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Erro interno do servidor' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async createTask(@Req() req: Request, @Body() data: CreateTaskDTO) {
        const user = req["user"]!
        return this.tasksService.createTask(user["sub"], data)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ 
        summary: 'Listar tarefas com paginação',
        description: 'Retorna uma lista paginada de tarefas com filtros opcionais. Apenas usuários autenticados podem acessar.'
    })
    @ApiQuery({ 
        name: 'page', 
        required: false, 
        type: 'string', 
        description: 'Número da página (padrão: 1)',
        example: '1'
    })
    @ApiQuery({ 
        name: 'size', 
        required: false, 
        type: 'string', 
        description: 'Tamanho da página (padrão: 10)',
        example: '10'
    })
    @ApiQuery({ 
        name: 'title', 
        required: false, 
        type: 'string', 
        description: 'Filtrar por título da tarefa',
        example: 'autenticação'
    })
    @ApiQuery({ 
        name: 'status', 
        required: false, 
        enum: ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'],
        description: 'Filtrar por status da tarefa',
        example: 'TODO'
    })
    @ApiQuery({ 
        name: 'priority', 
        required: false, 
        enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
        description: 'Filtrar por prioridade da tarefa',
        example: 'HIGH'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Lista de tarefas retornada com sucesso',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/TaskResponseDto' }
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', example: 1 },
                        size: { type: 'number', example: 10 },
                        total: { type: 'number', example: 25 },
                        totalPages: { type: 'number', example: 3 }
                    }
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ 
        description: 'Token JWT inválido ou ausente',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Unauthorized' },
                error: { type: 'string', example: 'Unauthorized' }
            }
        }
    })
    @ApiInternalServerErrorResponse({ 
        description: 'Erro interno do servidor',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Erro interno do servidor' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getTasks(
        @Query("page") page: string,
        @Query("size") size: string,
        @Query("title") title: string,
        @Query("status") status: string,
        @Query("priority") priority: string,
    ) {
        return this.tasksService.getTasksPagination(page, size, { title, status, priority })
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ 
        summary: 'Buscar tarefa por ID',
        description: 'Retorna os detalhes de uma tarefa específica pelo seu ID. Apenas usuários autenticados podem acessar.'
    })
    @ApiParam({ 
        name: 'id', 
        description: 'ID único da tarefa',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Tarefa encontrada com sucesso',
        type: TaskResponseDto
    })
    @ApiUnauthorizedResponse({ 
        description: 'Token JWT inválido ou ausente',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Unauthorized' },
                error: { type: 'string', example: 'Unauthorized' }
            }
        }
    })
    @ApiNotFoundResponse({ 
        description: 'Tarefa não encontrada',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Tarefa não encontrada' },
                error: { type: 'string', example: 'Not Found' }
            }
        }
    })
    @ApiInternalServerErrorResponse({ 
        description: 'Erro interno do servidor',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Erro interno do servidor' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateTaskById(@Param('id') id: string, @Body() data: UpdateTaskDTO, @Req() req: Request) {
        const user = req["user"]!
        return this.tasksService.updateTaskById(user["sub"], id, data)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteTaskById(@Param('id') id: string, @Req() req: Request) {
        const user = req["user"]!
        return this.tasksService.deleteTaskById(user["sub"], id)
    }

    @UseGuards(JwtAuthGuard)
    @Post("join/:id")
    async joinTask(@Req() req: Request, @Param("id") id: string) {
        const user = req["user"]!
        return this.tasksService.joinUserTask(user["sub"], id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/userInTask/:id")
    async getUserInTask(@Req() req: Request, @Param("id") id: string) {
        const user = req["user"]!
        return this.tasksService.getUserInTask(user["sub"], id)
    }

    @UseGuards(JwtAuthGuard)
    @Post("quit/:id")
    async quitTask(@Req() req: Request, @Param("id") id: string) {
        const user = req["user"]!
        return this.tasksService.quitUserTask(user["sub"], id)
    }

    @UseGuards(JwtAuthGuard)
    @Post(":id/comments")
    async commentInTask(@Req() req: Request, @Body() data: CreateCommentDTO, @Param("id") id: string) {
        const user = req["user"]!
        return this.tasksService.commentInTask(user["sub"], id, data)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/comments")
    async getTaskPagination(@Param('id') id: string, @Query("page") page: string, @Query("size") size: string) {
        return this.tasksService.getCommentsPagination(id, page, size)
    }
}   