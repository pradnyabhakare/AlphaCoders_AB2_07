from django.shortcuts import render, redirect
from MYUSER.models import UserInfo, PastDonation, Transaction, BloodBank, SOSNotification

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
