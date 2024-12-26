import { Registration } from "@/domain/registration/registration-request"

export interface RegistrationProtocol {
  register: (data: Registration.Request) => Promise<Registration.Response>
}
