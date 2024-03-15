import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if(this.userService.estaLogado()){
        return true
    } else {
        this.router.navigate(['/login']);
        return false
    }
  }
}