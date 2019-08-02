import 
{
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
   
   import { ToasterConfig } from 'angular2-toaster';

   import 'style-loader!angular2-toaster/toaster.css';
   import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
   import { NbToastStatus } from '@nebular/theme/components/toastr/model';
   import { Inject, Injector, Injectable } from "@angular/core";

   @Injectable()
   export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(@Inject(Injector) private injector: Injector) 
    {       
    }

    // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
    private get toastrService(): NbToastrService {
      return this.injector.get(NbToastrService);
    }

    config: ToasterConfig;

    index = 1;
    destroyByClick = true;
    duration = 0;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
    preventDuplicates = false;
    status: NbToastStatus = NbToastStatus.WARNING;

    title = 'Error';
    content = `Error`;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            if (error.error instanceof ErrorEvent) {
              // client-side error
              this.title = `Error`;
              this.content = `${error.error.message}`;
              this.showToast(this.status,this.title,this.content);
            } 
            else {
              // server-side error
              if ('errors' in error.error)
              {
                this.title = `Error: ${error.error.status}\n`;
                for (var i=0;i<Object.keys(error.error.errors).length;i++)
                {
                  var msg=error.error.errors[i];
                  this.content = msg;
                  this.showToast(this.status,this.title,this.content);
                }
              }
              else
              {
                this.title = `Error: ${error.statusText}\n`;
                var msg : any =error.error.message;
                this.content = msg;
                this.showToast(this.status,this.title,this.content);
              }
            }
            //window.alert(errorMessage);
            return throwError(this.content);
          })
        )
    }

    private showToast(type: NbToastStatus, title: string, body: string) {
      const config = {
        status: type,
        destroyByClick: this.destroyByClick,
        duration: this.duration,
        hasIcon: this.hasIcon,
        position: this.position,
        preventDuplicates: this.preventDuplicates,
      };
  
      this.index += 1;
      this.toastrService.show(
        body,
        `${title}`,
        config);
    }
    
  }