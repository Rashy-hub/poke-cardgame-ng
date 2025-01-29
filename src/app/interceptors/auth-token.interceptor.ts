import { HttpInterceptorFn } from '@angular/common/http'

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token')
    if (!token) return next(req)
    let headers = req.headers.set('Authorization', `Token ${token}`)
    const requestToSend = req.clone({
        headers: headers,
    })

    return next(requestToSend)
}
