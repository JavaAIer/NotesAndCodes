import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'service', ...(require('/Users/chencheng/Code/github.com/umijs/umi/packages/umi-build-dev/src/plugins/commands/ui/src/models/service.js').default) });
app.model({ namespace: 'model', ...(require('/Users/chencheng/Code/github.com/umijs/umi/packages/umi-build-dev/src/plugins/commands/ui/src/pages/index/model.js').default) });
