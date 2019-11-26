import {searchHandler} from '../MainFrame';
import {handlers} from '../../handlers/index';

export function assignHandler (
    handlerArray,
    location,
    params
){
    let handler = searchHandler(handlerArray,location);
    handler = handler.callback(params);
    return handler.bind(this);
}

export function awaitLoading (
    location,
    params,
    match
){
    const handler = handlers[match],
        fetchData = this.assignHandler(handler,location,params);
    this.setState(
        {
            loading:0,
            loadFinished:false,
            fetchData:fetchData,
            preventRedirect:false
        },() => {
            this.fetchHandler(params);
        }
    );
}
