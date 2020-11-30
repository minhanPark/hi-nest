import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should be return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe('getOne', () => {
    it('should be return a movie', () => {
      service.create({
        title: "testMovie",
        genres: ['text'],
        year: 2002
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: "testMovie",
        genres: ['text'],
        year: 2002
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    })
    it('should be return 404',() => {
      try {
        service.deleteOne(9999);
      } catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "test movie",
        year: 2022,
        genres: ["test"]
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: "test movie",
        year: 2022,
        genres: ["test"]
      });
      service.update(1, {title: 'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Test");
    })
    it('should throw a NotFoundExeption', () => {
      try {
        service.update(9999, {title: "Test"});
      } catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
