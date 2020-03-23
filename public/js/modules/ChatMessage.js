// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {
    props: ['msg'],
    template: `
    <p :class="{'my-message' : matchedID}" class='new-message'>
        <span>{{msg.message.name}}:</span><br>
        {{msg.message.content}}
    </p>
    `,

    data: function(){
        return { 
            message: 'hello from template',
            matchedID: this.$parent.socketID == this.msg.id
        }
    }
}