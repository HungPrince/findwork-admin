import { TestBed, inject } from '@angular/core/testing';

import { PostService } from './post.service';

describe('JobService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [JobService]
        });
    });

    it('should be created', inject([PostService], (service: PostService) => {
        expect(service).toBeTruthy();
    }));
});
