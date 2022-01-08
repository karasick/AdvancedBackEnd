import { Test, TestingModule } from '@nestjs/testing';
import { BanReasonService } from './ban-reason.service';

describe('BanReasonService', () => {
  let service: BanReasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BanReasonService],
    }).compile();

    service = module.get<BanReasonService>(BanReasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
