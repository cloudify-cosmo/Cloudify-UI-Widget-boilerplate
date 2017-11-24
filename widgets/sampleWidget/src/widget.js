import Content from './Content';

Stage.defineWidget({
    id: 'sampleWidget',
    name: 'Sample Widget',
    description: 'This is a sample widget for widget writing boilerplate',
    initialWidth: 12,
    initialHeight: 8,
    color: 'green',
    isReact: true,
    permission: Stage.GenericConfig.CUSTOM_WIDGET_PERMISSIONS.CUSTOM_ALL,
    categories: [Stage.GenericConfig.CATEGORY.OTHERS],

    render: function() {
        return (
            <Content/>
        );
    }
});