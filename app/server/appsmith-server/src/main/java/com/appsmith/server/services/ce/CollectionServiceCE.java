package com.appsmith.server.services.ce;

import com.appsmith.external.models.ActionDTO;
import com.appsmith.server.domains.Action;
import com.appsmith.server.domains.Collection;
import com.appsmith.server.services.CrudService;
import reactor.core.publisher.Mono;

import java.util.List;

public interface CollectionServiceCE extends CrudService<Collection, String> {

    Mono<Collection> findById(String id);

    Mono<Collection> addActionsToCollection(Collection collection, List<Action> actions);

    Mono<ActionDTO> addSingleActionToCollection(String collectionId, ActionDTO action);

    Mono<Action> removeSingleActionFromCollection(String collectionId, Mono<Action> action);
}
