import Content from './Content';

Stage.defineWidget({
    id: 'sampleWidget',
    name: 'Sample Widget',
    description: 'This is a sample widget for widget writing boilerplate',
    initialWidth: 12,
    initialHeight: 8,
    color: 'green',
    isReact: true,
    permission: 'widget-user',


    render: function() {
        return (
            <Content/>
        );
    }
});
