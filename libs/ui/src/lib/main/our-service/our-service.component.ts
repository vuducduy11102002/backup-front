import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
    selector: 'libs-our-service',
    templateUrl: './our-service.component.html'
})
export class OurServiceComponent {
    private hasLoadedData = false;
    @ViewChild('serviceSection') serviceSection: ElementRef | undefined;

    @HostListener('window:scroll', [])
    onScroll() {
        if (this.serviceSection) {
            const serviceSectionElement: HTMLElement = this.serviceSection.nativeElement;
            if (!this.hasLoadedData && window.scrollY > 100) {
                serviceSectionElement.classList.add('active');
                this.hasLoadedData = true;
            }
            //  else {
            //     serviceSectionElement.classList.remove('active');

            // }
        }
    }
}
