export interface Genre {
    slug: string;
    title: string;
}

export interface VideoGameCompany {
    slug: string;
    title: string;
}

export interface Platform {
    slug: string;
    title: string;
}

export interface VideoGame {
    slug: string;
    title: string;
    publisher?: VideoGameCompany;
    developer?: VideoGameCompany;
    year?: number;
    platforms?: Platform[];
    genre?: Genre;
    visual?: string;
}

/*
Published by
M.A.D.
Developed by
Binary Design, Ltd.
Released
1987
Platforms
Amstrad CPC, Atari 8-bit, Commodore 64, MSX, ZX Spectrum
Genre
Action
Visual
Isometric
 */