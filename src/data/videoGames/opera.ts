import slugify from '../../helpers/slugify';
import {
    Genre, Platform,
    VideoGame,
    VideoGameCompany,
} from '../../models/game';
import companies from './companies';
import genres from './genres';
import platforms from './platforms';

const company = (slug: string): VideoGameCompany => companies.find(c => (c.slug === slug));
const genre = (slug: string): Genre => genres.find(g => (g.slug === slug));
const platform = (slug: string): Platform => platforms.find(p => (p.slug === slug));

const opera: VideoGameCompany = company('opera');
const comix: VideoGameCompany = company('comix');
const dinamicSoftware: VideoGameCompany = company('dinamic-software');
const trueEmotionsSoftware: VideoGameCompany = company('true-emotions-software');
const trueSoft: VideoGameCompany = company('true-soft');

const amstrad: Platform = platform('amstrad');
const commodore: Platform = platform('commodore');
const msx: Platform = platform('msx');
const speccy: Platform = platform('speccy');
const allPlatforms: Platform[] = [
    amstrad,
    commodore,
    msx,
    speccy,
];

interface VideoGameData {
    title: string;
    year: number;
    genre?: Genre;
    publisher?: VideoGameCompany;
    developer?: VideoGameCompany;
    platforms?: Platform[];
}

const data: VideoGameData[] = [
    { title: 'Camelot Warriors', year: 1985, genre: genre('action'), publisher: dinamicSoftware, platforms: allPlatforms },

    { title: 'Livingstone, I Presume?', year: 1986, genre: genre('action'), platforms: [...allPlatforms], /*Amstrad CPC, Amstrad PCW, Atari ST, Commodore 64, DOS, MSX, ZX Spectrum */ },
    { title: 'Cosa Nostra', year: 1986, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, MSX, ZX Spectrum */ },

    { title: 'Goody', year: 1987, genre: genre('action'), platforms: [...allPlatforms], /*Amstrad CPC, Amstrad PCW, DOS, MSX, PC Booter, ZX Spectrum */ },
    { title: 'La Abadía del Crimen', year: 1987, genre: genre('adventure'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, DOS, MSX, ZX Spectrum */ },
    { title: 'The Last Mission', year: 1987, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, Amstrad PCW, MSX, PC Booter, ZX Spectrum */ },

    { title: 'Sol Negro', year: 1988, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amiga, Amstrad CPC, Amstrad PCW, Atari ST, DOS, MSX, ZX Spectrum */ },
    { title: 'Mutan Zone', year: 1988, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },

    { title: 'Corsarios', year: 1989, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amiga, Amstrad CPC, Amstrad PCW, Atari ST, MSX, PC Booter, ZX Spectrum */ },
    { title: 'Solo', year: 1989, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, DOS, ZX Spectrum */ },
    { title: 'Livingstone II', year: 1989, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amiga, Amstrad CPC, Amstrad PCW, Atari ST, DOS, MSX, ZX Spectrum */ },
    { title: 'Guillermo Tell', year: 1989, genre: genre('action'), developer: comix, platforms: [amstrad, msx, speccy], /*Amstrad CPC, DOS, MSX, ZX Spectrum */ },
    { title: 'MOT', year: 1989, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amiga, Amstrad CPC, Amstrad PCW, Atari ST, Commodore 64, DOS, MSX, ZX Spectrum */ },
    { title: 'Trigger', year: 1989, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, DOS, MSX, ZX Spectrum */ },
    { title: 'Gonzzalezz', year: 1989, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },
    { title: 'Ulises', year: 1989, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },

    { title: 'Mythos', year: 1990, genre: genre('action'), developer: comix, /*Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },
    { title: 'Poli Díaz', year: 1990, developer: null, platforms: [amstrad, msx, speccy], /*Sports	Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },
    { title: 'Sirwood', year: 1990, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },
    { title: 'Rescate en el Golfo', year: 1990, genre: genre('action'), developer: trueSoft, platforms: [amstrad, msx, speccy], /*Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },
    { title: 'Golden Basket', year: 1990, platforms: [amstrad, msx, speccy], /*Sports	Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },
    { title: 'Mundial de Fútbol', year: 1990, platforms: [amstrad, msx, speccy], /*Sports	Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },
    { title: 'Angel Nieto Pole 500', year: 1990, platforms: [amstrad, msx, speccy], /*Racing / driving	Amiga, Amstrad CPC, Amstrad PCW, Atari ST, DOS, MSX, ZX Spectrum */ },
    { title: 'Soviet', year: 1990, platforms: [amstrad, msx, speccy], /*Action, Strategy / tactics	Amstrad CPC, Amstrad PCW, DOS, MSX, ZX Spectrum */ },

    { title: 'Jai Alai', year: 1991, platforms: [amstrad, msx, speccy], /*Sports	Amstrad CPC, Amstrad PCW, Commodore 64, DOS, MSX, ZX Spectrum */ },
    { title: 'Poogaboo: La Pulga 2', year: 1991, genre: genre('action'), platforms: [amstrad, msx, speccy], /*Amstrad CPC, DOS, MSX, ZX Spectrum */ },

    { title: 'International Athletics', year: 1992, developer: trueEmotionsSoftware, platforms: [], /*Sports	DOS */ },
    { title: 'La Colmena', year: 1992, platforms: [], /*Strategy / tactics	Amiga, DOS */ },
];

const games: VideoGame[] = data.map((item) => ({
    ...item,
    slug: slugify(item.title),
    publisher: (item.publisher === undefined)
        ? opera
        : item.publisher,
    developer: (item.developer === undefined)
        ? (item.publisher || opera)
        : item.developer,
}))

export default games;
