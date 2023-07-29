import { TestBed } from '@angular/core/testing';

import { MessageBoardClientService } from './message-board-client.service';

describe('MessageBoardClientService', () => {
  let service: MessageBoardClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageBoardClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
