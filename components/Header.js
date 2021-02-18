import React, { useState } from 'react';
import { APP_NAME } from '../config';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import NProgress from 'nprogress';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { LOG_OUT_REQUEST } from '../actions/types';
import Search from './blog/Search';
import '.././node_modules/nprogress/nprogress.css';
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = (props) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const {me } = useSelector((state) => state.user);
    const toggle = () => setIsOpen(!isOpen);
    
    const signout = ()=>{
        dispatch({
            type: LOG_OUT_REQUEST,
        })
        Router.replace(`/signin`)
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Link href="/">
                    <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <>
                        <NavItem>
                <Link href="/blogs">
                  <NavLink>Blogs</NavLink>
                </Link>
              </NavItem>
                        </>

                        {!me &&(
                            <>
                                       <NavItem>
                                       <Link href="/signup">
                                           <NavLink>
           
                                               Signup
           
                                       </NavLink>
                                       </Link>
                                   </NavItem>
           
                                   <NavItem>
                                       <Link href="/signin">
                                           <NavLink>
           
                                               Signin
           
                                       </NavLink>
                                       </Link>
                                   </NavItem>
                                   </>
                        )}

{me && me.role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink>{`${me.name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {me && me.role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>{`${me.name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
                 {me && (
              <NavItem>
                <NavLink style={{ cursor: 'pointer' }} onClick={() => signout()}>
                  Signout
                </NavLink>
              </NavItem>
            )}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
              </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>Simple Text</NavbarText>
                </Collapse>
            </Navbar>
            <Search />
        </div>
        
    );
}

export default Header;