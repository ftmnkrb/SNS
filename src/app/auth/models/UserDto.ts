export interface UserDto {
    id?: string | null
    name: string | null
    university: string | null
    department: string | null
    description: string | null
    class: number | null
    photoUrl?: string | null
    email: string | null
    localId: string | null
    verified: boolean
}