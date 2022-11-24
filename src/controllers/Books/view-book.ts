import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { BookModel } from "../../models/BookModel";
import { InvalidIdException } from "../../exceptions/InvalidIdException";
import { BookNotFoundException } from "../../exceptions/BookNotFoundException";

export const viewBookController = async (request: Request, response: Response) => {
    if(isNaN(
        parseInt(request.params.id as string)
    )) throw new InvalidIdException(request.params.id);

    const id = parseInt(request.params.id as string);
    const foundedBook: BookModel | null = await prismaClient.book.findUnique({
        where: {
            id: id
        }
    });

    if(foundedBook === null) throw new BookNotFoundException(id);

    response.status(200).json(foundedBook).end();
}