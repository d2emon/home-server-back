import express from 'express';
import games from '../data/videoGames';
import {Platform, VideoGame} from '../models/game';
import {Book} from '../models/book';
import {Movie} from '../models/movie';
import platforms from '../data/videoGames/platforms';
import books from '../data/worldify/books';
import movies from '../data/worldify/movies';


const router = express.Router();

const platform = (slug: string): Platform => platforms.find(p => (p.slug === slug));
const speccy: Platform = platform('speccy');
const wordifyYear = (year: number): number => (year - 1900 + 5);

router.get('/books', (req: express.Request, res: express.Response) => res
    .json({
        books: games
            .filter((g: VideoGame) => (
                g.platforms
                    ? (g.platforms.indexOf(speccy) < 0)
                    : true
            ))
            .map((g: VideoGame): Book => {
                const data = books.find(i => (i.slug === g.slug)) || {};
                return {
                    slug: g.slug,
                    title: g.title,
                    author: g.publisher
                        ? {
                            slug: g.publisher.slug,
                            title: g.publisher.title,
                        }
                        : null,
                    year: wordifyYear(g.year),
                    ...data,
                };
            }),
    }));

router.get('/movies', (req: express.Request, res: express.Response) => res
    .json({
        movies: games
            .filter((g: VideoGame) => (
                g.platforms
                    ? (g.platforms.indexOf(speccy) >= 0)
                    : true
            ))
            .map((g: VideoGame): Movie => {
                const data = movies.find(i => (i.slug === g.slug)) || {};
                return {
                    slug: g.slug,
                    title: g.title,
                    /*
                    author: g.publisher
                        ? {
                            slug: g.publisher.slug,
                            title: g.publisher.title,
                        }
                        : null,

                     */
                    year: wordifyYear(g.year),
                    ...data,
                };
            }),
    }));

export default router;
