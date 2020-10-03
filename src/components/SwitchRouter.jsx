import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import history from '../services/history'
import RestrictedRoute from './RestrictedRoute'

export default function SwitchRouter({ children }) {
    
    const { location: { pathname: path } } = history

    const newChildren = Array.isArray(children) ? 
        children.map((child, i) => 'manutencao' in child.props ? <RestrictedRoute key={i} {...child.props} /> : child) 
        : 'manutencao' in children.props ? <RestrictedRoute {...children.props} /> : children

    return (
        <Switch>
            {newChildren}
            <Route render={() => <Redirect to={{ pathname: "/404", state: { path } }} />} />
        </Switch>
    )
}
