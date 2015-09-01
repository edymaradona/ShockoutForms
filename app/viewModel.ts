﻿module Shockout {
    
    export interface IViewModel {
        //Title: KnockoutObservable<string>;
        CreatedBy: KnockoutObservable<ISpPerson>;
        CreatedByName: KnockoutObservable<string>;
        CreatedByEmail: KnockoutObservable<string>;
        ModifiedBy: KnockoutObservable<ISpPerson>;
        ModifiedByName: KnockoutObservable<string>;
        ModifiedByEmail: KnockoutObservable<string>;

        parent: any;
        history: KnockoutObservable<Array<any>>;
        attachments: KnockoutObservable<Array<any>>;
        isAuthor: KnockoutObservable<boolean>
        currentUser: KnockoutObservable<any>;
        isValid: KnockoutComputed<boolean>;

        deleteItem(): void;
        cancel(): void;
        print(): void;
        deleteAttachment(obj: any, event: any): boolean;
        save(model: ViewModel, btn: HTMLElement): void;
        submit(model: ViewModel, btn: HTMLElement): void;
    }

    export class ViewModel implements IViewModel {

        public static createdByKey: string = 'CreatedByName';
        public static createdByEmailKey: string = 'CreatedByEmail';
        public static modifiedByKey: string = 'ModifiedByName';
        public static modifiedByEmailKey: string = 'ModifiedByEmail';
        public static createdKey: string = 'Created';
        public static modifiedKey: string = 'Modified';
        public static historyKey: string = 'history';
        public static historyDescriptionKey: string = 'description';
        public static historyDateKey: string = 'date';

        //public Title: KnockoutObservable<string> = ko.observable(null);
        public CreatedBy: KnockoutObservable<ISpPerson> = ko.observable(null);
        public CreatedByName: KnockoutObservable<string> = ko.observable(null);
        public CreatedByEmail: KnockoutObservable<string> = ko.observable(null);
        public ModifiedBy: KnockoutObservable<ISpPerson> = ko.observable(null);
        public ModifiedByName: KnockoutObservable<string> = ko.observable(null);
        public ModifiedByEmail: KnockoutObservable<string> = ko.observable(null);

        public parent: Shockout.SPForm;
        public history: KnockoutObservable<Array<any>> = ko.observableArray([]);
        public attachments: KnockoutObservableArray<IAttachment> = ko.observableArray([]);
        public isAuthor: KnockoutObservable<boolean> = ko.observable(false);
        public currentUser: KnockoutObservable<ICurrentUser> = ko.observable(null);
        public isValid: KnockoutComputed<boolean>;
        
        constructor(instance: Shockout.SPForm) {
            var self = this;
            this.parent = instance;

            this.isValid = ko.pureComputed(function (): boolean {
                return self.parent.formIsValid(self);
            });
        }

        public deleteItem(): void {
            this.parent.deleteListItem(this);
        }

        public cancel(): void {
            window.location.href = this.parent.sourceUrl != null ? this.parent.sourceUrl : this.parent.rootUrl;
        }

        public print(): void {
            window.print();
        }

        public deleteAttachment(obj: any, event: any): boolean {
            this.parent.deleteAttachment(obj);
            return false;
        }

        public save(model: ViewModel, btn: HTMLElement): void {
            this.parent.saveListItem(model, false);
        }

        public submit(model: ViewModel, btn: HTMLElement): void {
            this.parent.saveListItem(model, true);
        }

    }

}