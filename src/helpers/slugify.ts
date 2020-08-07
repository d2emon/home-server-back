import slugify from 'slugify';

export default (title: string): string => slugify(title, { lower: true });
