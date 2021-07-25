export default class CreateQueueServerRequest {
  constructor(public employeeId: string, public endpointId: string, public queueNodeIds: string[]) {}
}
