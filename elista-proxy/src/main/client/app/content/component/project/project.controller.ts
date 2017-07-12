/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class ProjectCtrl {

        user: IUser = {};
        employeeId = this.$stateParams.id;
        projectsArray: Array<IProjects>;
        projectsArrayMaintenance: Array<IProjects> = [];
        projectsArrayConceptual: Array<IProjects> = [];
        projectsArrayDevelop: Array<IProjects> = [];
        projectsArrayRollout: Array<IProjects> = [];
        projectsArrayClosure: Array<IProjects> = [];
        formContainerVisible = false;
        public projectType: Array<String>;

        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private ProjectService: IProjectService,
                    private $stateParams: ActorsStateParams) {
            this.$translatePartialLoader.addPart('project');
            this.$translatePartialLoader.addPart('icons');
            this.init();

        }

        private init() {
            this.ProjectService.getProject().then(this.getProjectsCallBack);
            this.ProjectService.getProjectStatus().then(this.getProjectsStatusCallBack);
        };

        private getProjectsStatusCallBack(res: Array<String>){
            this.projectType = res;

        }

        private getProjectsCallBack = (res: Array<IProjects>) => {
            this.projectsArray = res;

            for (var i = 0; i < this.projectsArray.length; i++){
                if (this.projectsArray[i].employeeId == this.employeeId){
                    if (this.projectsArray[i].status == "MAINTENANCE"){
                        this.projectsArrayMaintenance.push(this.projectsArray[i]);
                    }
                    if (this.projectsArray[i].status == "CONCEPTUAL_FRAMEWORK"){
                        this.projectsArrayConceptual.push(this.projectsArray[i]);
                    }
                    if (this.projectsArray[i].status == "DEVELOPMENT"){
                        this.projectsArrayDevelop.push(this.projectsArray[i]);
                    }
                    if (this.projectsArray[i].status == "ROLLOUT"){
                        this.projectsArrayRollout.push(this.projectsArray[i]);
                    }
                    if (this.projectsArray[i].status == "CLOSURE"){
                        this.projectsArrayClosure.push(this.projectsArray[i]);
                    }
                }
            }

        };


        private formContainer() {
            this.formContainerVisible = !this.formContainerVisible;
        };

    }

    angular.module('employees').controller('ProjectCtrl', ProjectCtrl);
}
