'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">angframework documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' : 'data-target="#xs-components-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' :
                                            'id="xs-components-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' }>
                                            <li class="link">
                                                <a href="components/AdminPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberMessagesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberMessagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MembersEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MembersEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessagesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MessagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PhotoEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhotoEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PhotoManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhotoManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RolesModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RolesModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserManagementComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' : 'data-target="#xs-directives-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' :
                                        'id="xs-directives-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' }>
                                        <li class="link">
                                            <a href="directives/HasRoleDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">HasRoleDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' : 'data-target="#xs-injectables-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' :
                                        'id="xs-injectables-links-module-AppModule-a0250df7ba47172067808ae7f5129874"' }>
                                        <li class="link">
                                            <a href="injectables/AlertifyService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AlertifyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/PaginatedResult.html" data-type="entity-link">PaginatedResult</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link">AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertifyService.html" data-type="entity-link">AlertifyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link">ErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ListResolver.html" data-type="entity-link">ListResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/MemberDetailResolver.html" data-type="entity-link">MemberDetailResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/MemberEditResolver.html" data-type="entity-link">MemberEditResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/MemberListResolver.html" data-type="entity-link">MemberListResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/MessagesResolver.html" data-type="entity-link">MessagesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/PreventUnsavedChanges.html" data-type="entity-link">PreventUnsavedChanges</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination.html" data-type="entity-link">Pagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Photo.html" data-type="entity-link">Photo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});