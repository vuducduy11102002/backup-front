import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
    selector: 'libs-our-blog',
    templateUrl: './our-blog.component.html'
})
export class OurBlogComponent {
    @ViewChild('blog') blog: ElementRef | undefined;

    @HostListener('window:scroll', [])
    onScroll() {
        if (this.blog) {
            const blogElement: HTMLElement = this.blog.nativeElement;
            if (window.scrollY > 100) {
                blogElement.classList.add('active');
            }
            // else {
            //     blogElement.classList.remove('active');
            // }
        }
    }
}
