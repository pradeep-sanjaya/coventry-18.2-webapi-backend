import makeMetaDataList from './meta-data-list';
import makeMetaDataEndpointHandler from './meta-data-endpoint';

const metaDataList = makeMetaDataList();
const metaDataEndpointHandler = makeMetaDataEndpointHandler({
    metaDataList
});

export default metaDataEndpointHandler;
