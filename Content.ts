import { UserDto } from "../auth/models/UserDto"

export interface Content {
    id?: string
    department: string
    lesson: string
    class: number
    description: string
    userLocalId: string
}