/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class SkillCtrl {

        employeeId = this.$stateParams.id;
        addNewSkill: ISkills;
        formContainerVisible = false;
        skillsArray: Array<ISkills>=[];
        skillsEmployeeArray: Array<ISkills>=[];


        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private SkillsService: ISkillsService,
                    private $stateParams: ActorsStateParams
        ) {
            this.init();
            this.$translatePartialLoader.addPart('icons');
            this.$translatePartialLoader.addPart('skills');
        }
        private init() {
            this.skillsArray =[];
            this.skillsEmployeeArray =[];
            this.SkillsService.getSkill().then(this.getSkillsCallBack);

        };
        private getSkillsCallBack = (res: Array<ISkills>) => {
            this.skillsArray = res;

            for (var i = 0; i < this.skillsArray.length; i++){
                if (this.skillsArray[i].employeeId == this.employeeId){
                        this.skillsEmployeeArray.push(this.skillsArray[i]);
                }
            }

        };

        private saveSkills = () => {
            this.addNewSkill.employeeId = this.employeeId;
            this.SkillsService.saveSkill(this.addNewSkill).then(this.saveSkillCallBack);
        };

        private saveSkillCallBack = (response) => {
            this.init();
            this.formContainerVisible = false;
            this.addNewSkill.skillName = defaultStatus;
            this.addNewSkill.description = defaultStatus;
        };

        private deleteSkillsId(id: number) {
            this.SkillsService.deleteSkillDetail(id).then(this.skillDeleteCallBack);

        };

        private skillDeleteCallBack = (res) => {
            this.init();
        };

        private back() {
            this.formContainerVisible = false;
            this.addNewSkill.skillName = defaultStatus;
            this.addNewSkill.description = defaultStatus;
        };

        private formcontainer() {

            this.formContainerVisible = !this.formContainerVisible;
            this.addNewSkill.skillName = defaultStatus;
            this.addNewSkill.description = defaultStatus;
        };

    }

    angular.module('employees').controller('SkillCtrl', SkillCtrl);
}
