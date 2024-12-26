import { RegistrationProtocol } from "@/data/registration/registration-protocol"
import { Registration, RegistrationService } from "@/domain/registration/registration-request"

export class RegistrationRepository implements RegistrationProtocol {
  constructor(private readonly registrationService: RegistrationService) {}
  async register(data: Registration.Request): Promise<Registration.Response> {
    return await this.registrationService.register(data)
  }
}
