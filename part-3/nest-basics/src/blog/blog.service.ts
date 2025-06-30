import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  private readonly blogs = [
    {
      id: 1,
      title: 'Blog 1',
      uniqueKey: 'BlogKey1',
    },
    {
      id: 2,
      title: 'Blog 2',
      uniqueKey: 'BlogKey2',
    },
    {
      id: 3,
      title: 'Blog 3',
      uniqueKey: 'BlogKey3',
    },
    {
      id: 4,
      title: 'Blog 4',
      uniqueKey: 'BlogKey4',
    },
    {
      id: 5,
      title: 'Blog 5',
      uniqueKey: 'BlogKey5',
    },
  ];
  findAll() {
    return this.blogs;
  }
  findById(id: number) {
    return this.blogs.find((blog) => blog.id === id);
  }
  findByKey(key: string) {
    return this.blogs.find((blog) => blog.uniqueKey === key);
  }
}
