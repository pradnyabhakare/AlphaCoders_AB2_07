from django.shortcuts import render, redirect
from MYUSER.models import UserInfo, PastDonation, Transaction, BloodBank, SOSNotification, BloodBankDetails
from django.http import JsonResponse

# Create your views here.
def dashboard(request):
    if request.session.get('auth_status'):
        return render(request, 'dashboard.html')
    return redirect('/')



def sos(request):
    if not request.session.get('auth_status'):
        return redirect('/')
    if request.method == 'GET':
        return render(request, 'SOS_PAGE.html')
    else:
        print(request.POST)
        blood_type = request.POST.get('blood_type')
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        unit = request.POST.get('unit')
        location = request.POST.get('location')
        location = location.replace(":", "").replace("Lat","").replace("Lng","").replace("(","").replace(")","").replace(" ","")
        lat = location.split(",")[0]
        lng = location.split(",")[1]
        case = "Emergency"
        
        Transaction.objects.create(
            user_from = UserInfo.objects.get(username=request.session.get('username')),
            user_full_name = UserInfo.objects.get(username=request.session.get('username')).fname + " " + UserInfo.objects.get(username=request.session.get('username')).lname,
            user_contact_information = contact,
            request_type = case,
            request_location = location,
            
            user_to=None,
            donor_full_name="NA",
            donor_location="NA",
            
            blood_type = blood_type,
            unit = unit,
            status=False
        )
        info = f"{name}|{contact}|{unit}"
        SOSNotification.objects.create(
            location=location,
            blood_type=blood_type,
            info=info
        )
        return render(request, 'SOS_PAGE.html')
    return redirect('/')

def request(request):
    if not request.session.get('auth_status'):
        redirect('/')
    if request.method == 'GET':
        return render(request, 'request.html')
    else:
        blood_type = request.POST.get('blood_type')
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        date = request.POST.get('date')
        unit = request.POST.get('unit')
        location = request.POST.get('location')
        location = location.replace(":", "").replace("Lat","").replace("Lng","").replace("(","").replace(")","").replace(" ","")
        lat = location.split(",")[0]
        lng = location.split(",")[1]
        case = "case" in request.POST
        if case:
            case = "Urgent"
        else:
            case = "Normal"
        
        print(blood_type, name, contact, date, unit, location, case, lat, lng)
        
        
        
        Transaction.objects.create(
            user_from = UserInfo.objects.get(username=request.session.get('username')),
            user_full_name = UserInfo.objects.get(username=request.session.get('username')).fname + " " + UserInfo.objects.get(username=request.session.get('username')).lname,
            user_contact_information = contact,
            request_type = case,
            request_location = location,
            
            user_to=None,
            donor_full_name="NA",
            donor_location="NA",
            
            blood_type = blood_type,
            unit = unit,
            status=False
        )
        
       
        return render(request, 'requestDone.html')
    return redirect('/')

def bloodbanklist(request):
    if not request.session.get('auth_status'):
        return redirect('/')
    if request.method == 'GET':
        return render(request, 'bloodbanklist.html')
    else:
        blood_type = request.POST.get('blood_type')
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        unit = request.POST.get('unit')
        location = request.POST.get('location')
        location = location.replace(":", "").replace("Lat","").replace("Lng","").replace("(","").replace(")","").replace(" ","")
        lat = location.split(",")[0]
        lng = location.split(",")[1]
        
        bloodbank = BloodBank.objects.get(name=name)
        bloodbank.storage[blood_type] += int(unit)
        bloodbank.save()
        
        PastDonation.objects.create(
            user = UserInfo.objects.get(username=request.session.get('username')),
            where = name,
            donation_for = "Blood Bank",
            unit = unit
        )
        
        return render(request, 'bloodbanklist.html')
    return redirect('/')

def banklist(request):
    if not request.session.get('auth_status'):
        return redirect('/')
    return render(request, 'bloodbanklist.html')

def navigation(request):
    if not request.session.get('auth_status'):
        return redirect('/')
    return render(request, 'navigation.html')   
 
def notification(request):
    if not request.session.get('auth_status'):
        return redirect('/')
    return render(request, 'notification.html')    

def impcontact(request):
    if not request.session.get('auth_status'):
        return redirect('/')
    return render(request, 'impcontact.html')    

def aboutus(request):
    if not request.session.get('auth_status'):
        return redirect('/')
    return render(request, 'aboutus.html')    

def get_blood_banks(request):
    blood_banks = BloodBankDetails.objects.all()
    
    data = []
    for bank in blood_banks:
        data.append({
            "id": bank.id,
            "name": bank.name,
            "location": bank.location,
            "contact": bank.contact,
            "availability": {
                "A_Positive": bank.a_positive,
                "B_Positive": bank.b_positive,
                "O_Positive": bank.o_positive,
                "AB_Positive": bank.ab_positive,
                "A_Negative": bank.a_negative,
                "B_Negative": bank.b_negative,
                "O_Negative": bank.o_negative,
                "AB_Negative": bank.ab_negative
            }
        })
    return JsonResponse(data, safe=False)

def get_transactions(request):
    transactions = Transaction.objects.all()
    
    data = []
    for transaction in transactions:
        location = transaction.request_location
        location = location.replace(":", "").replace("Lat","").replace("Lng","").replace("(","").replace(")","").replace(" ","")
        location = location.split(",")
        lat = float(location[0])
        lng = float(location[1])
        data.append({
            "user_full_name": transaction.user_full_name,
            "user_contact_information": transaction.user_contact_information,
            "blood_type": transaction.blood_type,
            "unit": transaction.unit,
            "request_type": transaction.request_type,
            "request_location": transaction.request_location,
            "location": [lat, lng]
        })
    
    return JsonResponse(data, safe=False)

def get_sos_notifications(request):
    sos_notifications = SOSNotification.objects.all().order_by('-id')[:10]  # Fetch latest 10 notifications
    
    data = []
    for sos in sos_notifications:
        data.append({
            "id": sos.id,
            "location": sos.location,
            "blood_type": sos.blood_type,
            "info": sos.info
        })

    return JsonResponse(data, safe=False)