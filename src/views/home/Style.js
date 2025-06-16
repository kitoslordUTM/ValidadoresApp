import * as Index from '../../index/index';
const { StyleSheet, wp, hp } = Index

const Style = StyleSheet.create({ 
     circleButton: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('7%'), // hace que sea perfectamente circular
        backgroundColor: '#f3f3f3', // color de fondo claro
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // para sombra (Android)
        shadowColor: '#000', // para sombra (iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
 
     },
     header :{
        marginTop: hp('5%'),
        marginBottom: hp('2%'),
        alignSelf: 'center',
     }
})

export default Style;