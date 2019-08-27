import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {isArray, mergeWith, cloneDeep} from 'lodash';
import {Defined} from '../libs/utilities';
import {FormGroup} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class StateService<T> {
    State: T = null;
    Steps: Step<T>[] = [];

    // WaitFor: BehaviorSubject<{wait: string[], type: 'Next' | 'Finish'}> = new BehaviorSubject<null>(null);
    ActiveStep: BehaviorSubject<Step<T>> = new BehaviorSubject<Step<T>>(null);

    // Before / after handling
    BeforeEach: (step: Step<T>, index: number, direction: 'next' | 'previous') => void = function () {
    };


    constructor() {
    }

    /**
     *
     */
    Initialize(state: T, steps: Step<T>[]) {
        this.State = state;
        this.Steps = steps;

        this.ActiveStep.next(steps[0]);
    }

    /**
     * Patching the actual state doesn't feel safe.
     * We want to re-set the state with the merged values, we save the states per step.
     */
    Patch(delta: Partial<T>, next: boolean = false) {
        const assigned = Object.assign({}, this.State);

        mergeWith(assigned, delta, (merge, src) => {
            if (isArray(merge)) {
                return src;
            }
        });
        this.State = assigned;

        // Step has been validated, user can go to next.
        this.ActiveStep.value.ValidNext = next;
    }

    /**
     *
     */
    Previous() {
        this.BeforeEach(this.ActiveStep.value, this.FindActiveStepIndex(), 'previous');
        this.ActiveStep.next(this.Steps[this.FindActiveStepIndex() - 1]);
    }

    /**
     *
     */
    async Next() {
        // Save current state in step, may be useful when ever someone decides to do
        // something with resetting states.
        this.ActiveStep.value.SetValue(this.State);

        // If the current step has a "BeforeNext" function, we need to fire it to see if
        // the validations return true.
        // Actual redirecting and handling the falsy bool will be done in the function.
        if (!await this.ActiveStep.value.BeforeNext()) {
            return;
        }

        // BeforeEach comes after the beforeNext, we need to actually know if we can go to the next state.
        this.BeforeEach(this.ActiveStep.value, this.FindActiveStepIndex(), 'next');

        // Go to next step. Value of current state has been set (CLONED) to the corresponding step.
        this.ActiveStep.next(this.Steps[this.FindActiveStepIndex() + 1]);
    }

    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//

    /**
     *
     */
    FindActiveStepIndex(): number {
        return this.Steps.indexOf(this.ActiveStep.value);
    }

    // /**
    //  *
    //  */
    // AddWaitFor(wait: string[], type: 'Next' | 'Finish') {
    //     this.WaitFor.next({wait, type});
    // }
}

export class Step<T> {
    /**
     * Used to communicate with from side bar.
     * This removes the use of subscriptions between body and sidebar
     */
    Form: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
    private value: T = null;

    /**
     * NOTE: Index does NOT have to be the index of the array it is in. Finding the actual index will be handled via a
     * "find" function. The index can be used for handling show/hide cases.
     */
    constructor(public Index: number,
                public ValidNext: boolean,
                public ValidBack: boolean,
                private beforeNext?: (value: T) => Promise<boolean>) {

    }

    /**
     *
     */
    SetForm(form: FormGroup) {
        this.Form.next(form);
    }

    /**
     *
     */
    SetValue(value: T) {
        this.value = cloneDeep(value);
    }

    /**
     *
     */
    async BeforeNext() {
        if (Defined(this.beforeNext)) {
            return await this.beforeNext(this.value);
        }

        return true;
    }
}

