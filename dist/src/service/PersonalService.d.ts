declare class PersonalService {
    private personalServiceRepository;
    private userRepository;
    constructor();
    SavePersonalService: (personalService: any, idPost: any, idUser: any) => Promise<any>;
}
declare const _default: PersonalService;
export default _default;
