/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';


    export class EmployeeDetailCtrl {

        private employee: IEmployee;
        public onDeleteEmployee: ($event) => void;
        employeeId = this.$stateParams.id;
        formContainerVisible = false;

        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams,
                    private $state: ng.ui.IStateService) {
            this.init();
            this.$translatePartialLoader.addPart('detail');
            this.$translatePartialLoader.addPart('icons');

        }

        private init(){
            this.EmployeeBackService.getEmployeeDetail(this.employeeId).then(this.getEmployeeDetailCallBack);

        }


        private getEmployeeDetailCallBack = (res: IEmployee) => {
            this.employee = res;
        };

        private deleteEmployeeId() {
                this.EmployeeBackService.deleteEmployeeDetail(this.employeeId).then(this.getEmployeeDeleteCallBack);
        };

        private getEmployeeDeleteCallBack = (res: IEmployee) => {
            this.onDeleteEmployee({$event: angular.copy(this.employeeId)});
            /*przypisanei dopeiro w callbacku, po wywołaniu metody*/
            this.$state.go('access.userPage');

        };

        private hideForm(hideVariable) {
            this.init();
            this.onDeleteEmployee({$event: angular.copy(this.employeeId)});
            this.formContainerVisible = hideVariable;
        };

        private formContainer() {
            this.formContainerVisible = !this.formContainerVisible;
        };


    }

    angular.module('employees').controller('EmployeeDetailCtrl', EmployeeDetailCtrl);
}
