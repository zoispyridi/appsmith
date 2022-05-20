import { Datasource } from "entities/Datasource";
import { ENTITY_TYPE } from "entities/DataTree/dataTreeFactory";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { DependencyMap, DynamicPath } from "utils/DynamicBindingUtils";
import { getDataTreeDatasourceConfigPath } from "entities/Action/actionProperties";
// import { PluginType } from "entities/Action";

export interface DataTreeDatasource {
  //   pluginType: PluginType.JS;
  pluginId: string;
  name: string;
  id: string;
  ENTITY_TYPE: ENTITY_TYPE.DATASOURCE;
  config: any;
  dynamicBindingPathList: DynamicPath[];
  bindingPaths: Record<string, EvaluationSubstitutionType>;
  dependencyMap: DependencyMap;
}

export function generateDataTreeDatasources(
  datasource: Datasource,
  dependencyConfig: DependencyMap = {},
): DataTreeDatasource {
  /* eslint-disable */
  const dependencyMap: DependencyMap = {};
  Object.entries(dependencyConfig).forEach(([dependent, dependencies]) => {
    dependencyMap[
      getDataTreeDatasourceConfigPath(dependent)
    ] = dependencies.map(getDataTreeDatasourceConfigPath);
  });

  return {
    pluginId: datasource.pluginId,
    name: datasource.name,
    id: datasource.id,
    ENTITY_TYPE: ENTITY_TYPE.DATASOURCE,
    config: datasource.datasourceConfiguration,
    dynamicBindingPathList: datasource.dynamicBindingPathList,
    bindingPaths: {},
    dependencyMap: dependencyMap,
  };
}
