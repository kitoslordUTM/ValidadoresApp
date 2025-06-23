import * as Index from '../../index'
const { StyleSheet, hp , wp } = Index

const Styles = StyleSheet.create({
   logo: {
    height: hp(52),
    width: wp(100),
    backgroundColor: '#FF4500',     
    borderBottomLeftRadius: 190, 
    borderBottomRightRadius: 190,
    top:3 , 
    position:'absolute',
    alignContent:'center',
    alignItems:'center'
    },
    container  : {
        width: wp(90),
        height: hp(42),
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: '#fff',
        top: hp(40),
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        borderBottomEndRadius: 30
        },
    inputContainer: {
        width: wp(80),
        marginBottom: hp(2),
        },
    input: {
        height: hp(7),
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: wp(3),
        },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
        borderRadius: 5,
        marginTop: hp(2),
        },
    buttonText: {
        color: '#fff',
        fontSize: hp(2.5),
        textAlign: 'center',
        },
    errorText: {
        color: 'red',
        fontSize: hp(2),
        marginTop: hp(1),
        },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp(3),
        },
    footerText: {
        fontSize: hp(2),
        },
    footerLink: {
        color: '#007BFF',
        fontSize: hp(2),
            fontWeight: 'bold',
            },
        });
        
        
export default Styles;